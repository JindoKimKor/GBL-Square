import { NextRequest, NextResponse } from 'next/server';

/**
 * Extract and validate OAuth callback parameters
 * Common logic for GitHub, GitLab, and Bitbucket
 */
export function extractOAuthParams(request: NextRequest): {
  code: string | null;
  error: string | null;
} {
  const searchParams = request.nextUrl.searchParams;
  return {
    code: searchParams.get('code'),
    error: searchParams.get('error'),
  };
}

/**
 * Create error redirect response
 */
export function createErrorRedirect(
  request: NextRequest, 
  error: string
): NextResponse {
  return NextResponse.redirect(
    new URL(`/?error=${error}`, request.url)
  );
}

/**
 * Create success redirect response
 */
export function createSuccessRedirect(
  request: NextRequest,
  path: string = '/'
): NextResponse {
  return NextResponse.redirect(new URL(path, request.url));
}