
// code to limit the shorten the Address

export const shortenLandmark = (address, limit) => {
    if (address.length > limit) {
      return address.slice(0, limit) + "...";
    }
    return address;
  };