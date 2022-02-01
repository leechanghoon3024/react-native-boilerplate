import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const FaceBookIcon = () => {
    return (
        <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
            <G clip-path="url(#clip0_126_3228)">
                <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.589 4.47977H15.2149V0.128403H11.589C8.79017 0.128403 6.51297 2.4056 6.51297 5.20445V7.38012H3.61176V11.732H6.5121V23.3355H10.8639V11.732H14.4898L15.2149 7.38015H10.8639V5.20445C10.8639 4.81127 11.1958 4.47937 11.589 4.47937V4.47981L11.589 4.47977Z"
                    fill="white"
                />
            </G>
            <Defs>
                <ClipPath id="clip0_126_3228">
                    <Rect width="23.2071" height="23.2071" fill="white" transform="translate(0.809021 0.128403)" />
                </ClipPath>
            </Defs>
        </Svg>
    );
};

export default FaceBookIcon;
