function useCookie() {
  function setCookie(key, value, expiryDateInMinutes) {
    let data = JSON.stringify(value);

    let expires = "";
    if (expiryDateInMinutes) {
      let date = new Date();
      date.setTime(date.getTime() + expiryDateInMinutes * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = key + "=" + (data || "") + expires + "; path=/";
  }

  function getCookie(key) {
    const nameEQ = key + "=";

    const ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function deleteCookie(key) {
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  return { setCookie, getCookie, deleteCookie };
}

export default useCookie;
