export const formatDate = (input: string | number | Date): string => {
  const date = new Date(input);

  return date.toLocaleDateString('en-US', {
    month: 'short',  
    day: 'numeric', 
    year: 'numeric', 
  });
};


export const formatDateTime = (date: string | number | Date) : string => {
  const formatted = new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const [month, day, yearAndTime] = formatted.split('/');
  const [year, time] = yearAndTime.split(', ');
  return `${year}-${month}-${day} (${time.replace(' ', '')})`;
}