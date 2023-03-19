/**
 * Method converts timestamp to DD/MM/YYYY format
 */
export const formatDate = (tempDate) => {
    
  const year = tempDate.getFullYear();
  let month = tempDate.getMonth() + 1;
  let day = tempDate.getDate();

  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  return day + "/" + month + "/" + year;
};