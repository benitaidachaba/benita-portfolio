// Temporary vector study. Original raster generation failed; see docs/ARTWORK.md.
export function GlassStudy() {
  return (
    <div className="glass-study">
      <div className="artwork-frame" aria-hidden="true">
        <svg
          className="glass-svg"
          viewBox="0 0 560 560"
          fill="none"
          focusable="false"
        >
          <defs>
            <linearGradient
              id="glass-base"
              x1="100"
              y1="90"
              x2="470"
              y2="470"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" stopOpacity=".95" />
              <stop offset=".23" stopColor="#7CBBDA" stopOpacity=".3" />
              <stop offset=".48" stopColor="#072D50" stopOpacity=".85" />
              <stop offset=".6" stopColor="#B2DFF4" stopOpacity=".6" />
              <stop offset=".82" stopColor="#fff" stopOpacity=".9" />
              <stop offset="1" stopColor="#4883A6" stopOpacity=".6" />
            </linearGradient>
            <linearGradient
              id="glass-highlight"
              x1="100"
              y1="130"
              x2="460"
              y2="400"
            >
              <stop stopColor="white" />
              <stop offset=".5" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity=".8" />
            </linearGradient>
            <linearGradient id="glass-edge" x1="140" y1="150" x2="400" y2="440">
              <stop stopColor="#fff" />
              <stop offset=".5" stopColor="#578EAD" />
              <stop offset="1" stopColor="#E6F6FF" />
            </linearGradient>
            <filter
              id="art-shadow"
              x="-50%"
              y="-100%"
              width="200%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="14" />
            </filter>
            <filter
              id="glass-depth"
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feDropShadow
                dx="7"
                dy="13"
                stdDeviation="9"
                floodColor="#072D50"
                floodOpacity=".16"
              />
            </filter>
          </defs>
          <ellipse
            cx="293"
            cy="475"
            rx="133"
            ry="13"
            fill="#072D50"
            opacity=".15"
            filter="url(#art-shadow)"
          />
          <g filter="url(#glass-depth)">
            <ellipse
              cx="249"
              cy="248"
              rx="119"
              ry="157"
              transform="rotate(-38 249 248)"
              stroke="url(#glass-base)"
              strokeWidth="44"
            />
            <ellipse
              cx="249"
              cy="248"
              rx="137"
              ry="176"
              transform="rotate(-38 249 248)"
              stroke="url(#glass-edge)"
              strokeWidth="1.5"
            />
            <ellipse
              cx="249"
              cy="248"
              rx="104"
              ry="141"
              transform="rotate(-38 249 248)"
              stroke="url(#glass-highlight)"
              strokeWidth="2"
            />
            <ellipse
              cx="328"
              cy="302"
              rx="110"
              ry="150"
              transform="rotate(38 328 302)"
              stroke="url(#glass-base)"
              strokeWidth="43"
            />
            <ellipse
              cx="328"
              cy="302"
              rx="130"
              ry="170"
              transform="rotate(38 328 302)"
              stroke="url(#glass-edge)"
              strokeWidth="1.5"
            />
            <ellipse
              cx="328"
              cy="302"
              rx="96"
              ry="135"
              transform="rotate(38 328 302)"
              stroke="url(#glass-highlight)"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
