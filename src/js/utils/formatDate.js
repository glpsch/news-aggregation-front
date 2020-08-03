export default function formatDate(date) {
const formattedDate = new Date(Date.parse(date));
const d = formattedDate;

const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

console.log(`${da}-${mo}-${ye}`);



// return formattedDate;
return (`${da}-${mo}-${ye}`);
}