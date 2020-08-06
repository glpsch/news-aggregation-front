export default function formatDate(date) {
const d = new Date(Date.parse(date));

const timeOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'UTC'
};

// const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
// const mo = new Intl.DateTimeFormat('ru', { month: 'long' }).format(d)
// const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
// return (`${da} ${mo}, ${ye}`);
//TODO

return  d.toLocaleString("ru", timeOptions);

}