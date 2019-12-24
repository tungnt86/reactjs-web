import i18next from 'i18next';
import en from '../languages/en';
import vi from '../languages/vi';

i18next
    .init({
        interpolation: {
            escapeValue: false,
        },
        lng: 'vi',
        resources: {en, vi},
    });

export default i18next