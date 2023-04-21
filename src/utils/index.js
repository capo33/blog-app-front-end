export const uperCaseFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const hours = newDate.getHours();
  return `${day}/${month}/${year} ${hours}:00`;
};

export const RenderDetails = ({ name, value }) => {
  return (
    <div className='text-sm leading-normal mt-0 mb-2 text-orange-600 '>
      <span className='mr-2 text-blue-800 text-lg capitalize'>{name}:</span>
      <span className='text-lg'>{value ? value : `No ${name}`}</span>
    </div>
  );
};

export const subStringFunc = (str, length) => {
  if (str?.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};
