export function GUP(name, url) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regexS = '[\\?&]' + name + '=([^&#]*)';
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

export const SubNumberHandler = (str: any) => {
    if (!str) {
        return '';
    }
    return `***${str.substring(str.length - 3, str.length)}`;
};

export const textSizing = (text: any, max: number) => {
    if (!text) return '';
    if (text.length === 0) return '';
    return `${text.substr(0, max)} ${text.length > max ? '...' : ''}`.trim();
};

export const addressNullCheck = (text) => {
    if (!text) return '';
    return `, ${text}`;
};
