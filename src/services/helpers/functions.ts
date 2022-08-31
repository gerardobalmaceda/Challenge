export const calculateAge = async (fecha: string) => {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const birtdayYear = fecha.split("/");
    let age = year - parseInt(birtdayYear[2]);
    var birthDayMont = month - parseInt(birtdayYear[1]);

    if (
      birthDayMont < 0 ||
      (birthDayMont === 0 && day < parseInt(birtdayYear[0]))
    ) {
      age--;
    }
    return age;
  } catch (error) {
    throw error;
  }
};
