import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const GoogleIcon = () => {
    return (
        <Svg width="22" height="23" viewBox="0 0 22 23" fill="none">
            <G clip-path="url(#clip0_126_3215)">
                <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.8835 10.2567V13.9757H16.9251C16.6798 15.5722 15.098 18.6517 10.8835 18.6517C7.24697 18.6517 4.28004 15.5858 4.28004 11.8071C4.28004 8.02878 7.24697 4.96281 10.8835 4.96281C12.9517 4.96281 14.3376 5.86126 15.1287 6.63526L18.0209 3.80142C16.1651 2.03173 13.76 0.963593 10.8851 0.963593C4.99681 0.963593 0.232239 5.81325 0.232239 11.8067C0.232239 17.8001 4.99681 22.6497 10.8851 22.6497C17.0317 22.6497 21.1133 18.2491 21.1133 12.056C21.1133 11.3445 21.0386 10.8026 20.9466 10.2603L10.8851 10.2559L10.8835 10.2567V10.2567Z"
                    fill="white"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_126_3215">
                    <Rect width="21.3049" height="21.6853" fill="white" transform="translate(0.0210571 0.96405)" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default GoogleIcon;
