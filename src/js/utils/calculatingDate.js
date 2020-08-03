const calculatingDate = {
  currentDate() {
    const date = new Date();

    const dayNow = ("0" + new Date().getDate()).slice(-2);


    const monthNow = ("0" + (new Date().getMonth() + 1)).slice(-2);
    const yearNow = new Date().getFullYear();

    return(`${yearNow}-${monthNow}-${dayNow}`);
  },

  weekAgo() {
    const date = new Date();

    const days = 7; // Days you want to subtract
    const last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
    const day =("0" + last.getDate()).slice(-2)
    const month=("0" + (last.getMonth() + 1)).slice(-2);
    const year=last.getFullYear();

    return(`${year}-${month}-${day}`);

   }

}

export default calculatingDate