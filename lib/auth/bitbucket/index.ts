import { bitbucketConfig } from "./config";
import { BitbucketUser, BitbucketEmail } from "./types";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export function getBitbucketAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: bitbucketConfig.clientId,
    response_type: "code",
    redirect_uri: bitbucketConfig.redirectUri,
    scope: bitbucketConfig.scope,
    state: state,
  });

  return `${bitbucketConfig.authorizationUrl}?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const response = await fetch(bitbucketConfig.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: bitbucketConfig.clientId,
      client_secret: bitbucketConfig.clientSecret,
      redirect_uri: bitbucketConfig.redirectUri,
    }).toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json();
}

export async function fetchBitbucketUser(accessToken: string): Promise<BitbucketUser & { email: string | null }> {
  const userResponse = await fetch(bitbucketConfig.userApiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!userResponse.ok) {
    throw new Error(`Failed to fetch user: ${userResponse.status}`);
  }

  const user: BitbucketUser = await userResponse.json();

  // Fetch user's email addresses (requires separate API call)
  let email: string | null = null;
  try {
    const emailResponse = await fetch(bitbucketConfig.userEmailsUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (emailResponse.ok) {
      const emailData = await emailResponse.json();
      const emails: BitbucketEmail[] = emailData.values || [];

      // Find the primary email, or fall back to the first confirmed email
      const primaryEmail = emails.find((e) => e.is_primary && e.is_confirmed);
      const confirmedEmail = emails.find((e) => e.is_confirmed);
      email = primaryEmail?.email || confirmedEmail?.email || null;
    }
  } catch (error) {
    console.warn("Failed to fetch Bitbucket user emails:", error);
  }

  return {
    ...user,
    email,
  };
}

export async function findOrCreateBitbucketUser(
  bitbucketUser: BitbucketUser & { email: string | null }
): Promise<User> {
  try {
    const user = await prisma.user.upsert({
      where: {
        oauthProvider_oauthId: {
          oauthProvider: "bitbucket",
          oauthId: bitbucketUser.uuid,
        },
      },
      update: {
        email: bitbucketUser.email || undefined,
        name: bitbucketUser.display_name,
        avatarUrl: bitbucketUser.links.avatar.href,
      },
      create: {
        email: bitbucketUser.email || `${bitbucketUser.account_id}@bitbucket.oauth`,
        name: bitbucketUser.display_name,
        avatarUrl: bitbucketUser.links.avatar.href,
        oauthProvider: "bitbucket",
        oauthId: bitbucketUser.uuid,
      },
    });

    return user;
  } catch (err) {
    console.error("Failed to create or update Bitbucket user:", err);
    throw new Error("Failed to create or update user in database");
  }
}
