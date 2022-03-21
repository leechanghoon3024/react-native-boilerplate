import React from 'react';
import { Svg, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';
interface Props {
    color: string;
    boolean: boolean;
}
const PasswordViewIcon = ({ color, boolean }: Props) => {
    return (
        <>
            {!boolean ? (
                <Svg width="27" height="27" viewBox="0 0 27 27" fill="none">
                    <G clip-path="url(#clip0_415_4712)">
                        <Path
                            d="M13.4999 9.81836C11.4688 9.81836 9.81812 11.469 9.81812 13.5002C9.81812 15.5313 11.4688 17.182 13.4999 17.182C15.5311 17.182 17.1818 15.5313 17.1818 13.5002C17.1818 11.469 15.531 9.81836 13.4999 9.81836Z"
                            fill="#A6A6A6"
                        />
                        <Path
                            d="M13.5 4.29541C7.36364 4.29541 2.1232 8.11219 0 13.5C2.1232 18.8877 7.36364 22.7045 13.5 22.7045C19.6425 22.7045 24.8769 18.8877 27.0001 13.5C24.8769 8.11219 19.6425 4.29541 13.5 4.29541ZM13.5 19.6363C10.1128 19.6363 7.36364 16.8872 7.36364 13.4999C7.36364 10.1126 10.1128 7.36358 13.5 7.36358C16.8873 7.36358 19.6364 10.1127 19.6364 13.5C19.6364 16.8872 16.8873 19.6363 13.5 19.6363Z"
                            fill="#A6A6A6"
                        />
                    </G>
                    <Defs>
                        <ClipPath id="clip0_415_4712">
                            <Rect width="27" height="27" fill="white" />
                        </ClipPath>
                    </Defs>
                </Svg>
            ) : (
                <Svg width="27" height="27" viewBox="0 0 27 27" fill="none">
                    <Path
                        d="M13.2944 9.22397L17.1595 13.089L17.1779 12.8865C17.1779 10.8559 15.5276 9.20557 13.4969 9.20557L13.2944 9.22397Z"
                        fill="#A6A6A6"
                    />
                    <Path
                        d="M13.4969 6.75155C16.8834 6.75155 19.6319 9.50003 19.6319 12.8865C19.6319 13.6779 19.4724 14.4325 19.1963 15.1258L22.7853 18.7147C24.638 17.1687 26.0982 15.1687 27 12.8865C24.8712 7.50005 19.6381 3.68408 13.497 3.68408C11.7792 3.68408 10.135 3.99081 8.60742 4.54296L11.2577 7.18711C11.9509 6.91719 12.7055 6.75155 13.4969 6.75155Z"
                        fill="#A6A6A6"
                    />
                    <Path
                        d="M1.22697 3.40792L4.02452 6.20547L4.58282 6.76377C2.55828 8.34659 0.957055 10.4509 0 12.8864C2.12272 18.2729 7.36196 22.0889 13.497 22.0889C15.3988 22.0889 17.2147 21.7208 18.8773 21.0521L19.3988 21.5736L22.9755 25.1564L24.54 23.5981L2.79139 1.84351L1.22697 3.40792ZM8.01229 10.1871L9.90799 12.0828C9.85278 12.3466 9.81597 12.6104 9.81597 12.8864C9.81597 14.9171 11.4663 16.5674 13.497 16.5674C13.773 16.5674 14.0368 16.5306 14.2945 16.4754L16.1902 18.3711C15.3743 18.776 14.4663 19.0214 13.497 19.0214C10.1104 19.0214 7.36196 16.273 7.36196 12.8864C7.36196 11.9171 7.60738 11.0091 8.01229 10.1871Z"
                        fill="#A6A6A6"
                    />
                </Svg>
            )}
        </>
    );
};

export default PasswordViewIcon;
