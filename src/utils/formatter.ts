export const formatCurrency = (currency: number): string => {
    return currency.toLocaleString( 'pt-br', {style: 'currency', currency: 'BRL'});
};

export const formatDate = (date: string): string => {
    const dateFormatted = new Date(date);
    const year = dateFormatted.getFullYear();

    const day = dateFormatted.getDate() > 9 ? dateFormatted.getDate() : `0${dateFormatted.getDate()}`;
    const month = dateFormatted.getMonth() + 1 > 9 ? dateFormatted.getMonth() + 1 : `0${dateFormatted.getMonth() + 1}`;

    return `${day}/${month}/${year}`
}
