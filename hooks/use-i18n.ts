import { useContext, Context } from 'react';
import { I18nContext, I18nWrapper } from '../lib/i18n';

export default function useI18n() {
    const i18n: Partial<I18nWrapper> = useContext(I18nContext);
    return i18n;
}