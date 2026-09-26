import React from 'react';

/**
 * Shopy logomark — a minimal three-peak mountain icon referencing the Himalayas,
 * paired with the "shopy" wordmark in the brand serif font.
 *
 * Props:
 *  - wordmark  {boolean}  show the "shopy" text next to the icon (default: true)
 *  - className {string}   applied to the outer wrapper
 *  - iconSize  {number}   height of the SVG icon in px (default: 28)
 */
export const Logo = ({ wordmark = true, className = '', iconSize = 28 }) => (
  <span className={`inline-flex items-center gap-2 ${className}`}>
    {/* Mountain-peak logomark — three geometric peaks, crisp at any size */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      {/* Background circle — uses CSS var so it adapts on dark vs light surfaces */}
      <circle cx="16" cy="16" r="15" fill="currentColor" opacity="0.08" />

      {/* Left smaller peak */}
      <polyline
        points="4,24 10,13 14,19"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Right smaller peak */}
      <polyline
        points="18,19 22,13 28,24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Centre tallest peak */}
      <polyline
        points="10,24 16,8 22,24"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Snow cap on centre peak */}
      <polyline
        points="13.5,16.5 16,8 18.5,16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.45"
      />
    </svg>

    {wordmark && (
      <span
        style={{
          fontFamily: 'Georgia, "Times New Roman", Times, serif',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        shopy
      </span>
    )}
  </span>
);
