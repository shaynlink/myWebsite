export const GA_TRAKING_ID = process.env.NEXT_PUBLIC_GA_TRAKING_ID;

export function pageview(url: string): void {
    window.gtag('config', GA_TRAKING_ID, {
        page_path: url
    })
}

interface GtagEvent {
    action: string;
    category: string;
    label: string;
    value: any;
}

export function event({ action, category, label, value }: GtagEvent): void {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value
    })
}
