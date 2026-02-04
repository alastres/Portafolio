import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 512,
    height: 512,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0f172a', // dark:bg-background (Premium Dark Mode)
                    color: '#3b82f6', // dark:text-primary (Bright Blue)
                    borderRadius: 96, // rounded-3xl equivalent for this scale
                    border: '16px solid #1e293b', // dark:border-border (Deep Slate)
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="320"
                    height="320"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" x2="20" y1="19" y2="19" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    )
}
