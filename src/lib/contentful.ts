export async function getLandingPage() {
    const res = await fetch(
        `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?content_type=landingPage`,
        {
            headers: {
                Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
            },
            next: { revalidate: 60 }
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch from Contentful')
    }

    const data = await res.json()
    return data.items[0] // 첫 번째 항목 반환
}