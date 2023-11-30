export default function Hamburger(props: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			{...props}
		>
			<g clip-path="url(#clip0_13259_99264)">
				<path
					d="M15.0588 2.01174H0.941176C0.917986 2.01174 0.877172 2.0022 0.83358 1.95367C0.78761 1.9025 0.75 1.81745 0.75 1.71412C0.75 1.6108 0.78761 1.52574 0.83358 1.47457C0.877172 1.42605 0.917986 1.4165 0.941176 1.4165H15.0588C15.082 1.4165 15.1228 1.42605 15.1664 1.47457C15.2124 1.52574 15.25 1.61079 15.25 1.71412C15.25 1.81745 15.2124 1.90251 15.1664 1.95367C15.1228 2.00219 15.082 2.01174 15.0588 2.01174ZM15.0588 8.29746H0.941176C0.917987 8.29746 0.877172 8.28791 0.83358 8.23939C0.78761 8.18822 0.75 8.10317 0.75 7.99984C0.75 7.89651 0.78761 7.81146 0.83358 7.76029L0.275664 7.25906L0.83358 7.76029C0.877172 7.71177 0.917986 7.70222 0.941176 7.70222H15.0588C15.082 7.70222 15.1228 7.71177 15.1664 7.76029L15.7243 7.25906L15.1664 7.76029C15.2124 7.81146 15.25 7.89651 15.25 7.99984C15.25 8.10317 15.2124 8.18822 15.1664 8.23939C15.1228 8.28791 15.082 8.29746 15.0588 8.29746ZM15.0588 14.5832H0.941176C0.917985 14.5832 0.877171 14.5736 0.83358 14.5251C0.78761 14.4739 0.75 14.3889 0.75 14.2856C0.75 14.1822 0.78761 14.0972 0.83358 14.046C0.877171 13.9975 0.917985 13.9879 0.941176 13.9879H15.0588C15.082 13.9879 15.1228 13.9975 15.1664 14.046C15.2124 14.0972 15.25 14.1822 15.25 14.2856C15.25 14.3889 15.2124 14.4739 15.1664 14.5251C15.1228 14.5736 15.082 14.5832 15.0588 14.5832Z"
					fill="#242627"
					stroke="#242627"
					stroke-width="1.5"
				/>
			</g>
			<defs>
				<clipPath id="clip0_13259_99264">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
}
