import { circles } from "../../data";

export const splitDescription = (description: string): string[] => {
    const words = description.split(" ");
    const totalWords = words.length;
    const targetLines = 3;

    const wordsPerLine = Math.ceil(totalWords / targetLines);
    

    const lines: string[] = [];
    let current: string[] = [];

    words.forEach((word, i) => {
        current.push(word);

        if (current.length >= wordsPerLine || i === words.length - 1) {
        lines.push(current.join(" "));
        current = [];
        }
    });

    while (lines.length < targetLines) lines.push("");

    return lines.slice(0, targetLines);
};

export const buildPath = `
        M ${circles[0].cx} ${circles[0].cy}
        ${circles
        .slice(1)
        .map((circle, i) => {
            const prevCircle = circles[i];
            const controlPoint1 = {
            x: prevCircle.cx + (circle.cx - prevCircle.cx) * 0.25,
            y: prevCircle.cy,
            };
            const controlPoint2 = {
            x: circle.cx - (circle.cx - prevCircle.cx) * 0.25,
            y: circle.cy,
            };
            return `C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${circle.cx} ${circle.cy}`;
        })
        .join(" ")}
`;
