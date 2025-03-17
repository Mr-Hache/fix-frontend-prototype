type HexColor = `#${string}`;

const black1: HexColor = '#000000';
const gray1: HexColor = '#141414';
const gray2: HexColor = '#212122';
const gray3: HexColor = '#262628';
const gray4: HexColor = '#3E3E40';
const gray5: HexColor = '#919098';
const orange1: HexColor = '#FE8330';
const white1: HexColor = '#F0F0EB';

type Colors = {
  black: {
    1: HexColor;
  };
  gray: {
    1: HexColor;
    2: HexColor;
    3: HexColor;
    4: HexColor;
    5: HexColor;
  };

  orange: {
    1: HexColor;
  };
  white: {
    1: HexColor;
  };
};

export const colors: Colors = {
  black: {
    1: black1,
  },
  gray: {
    1: gray1,
    2: gray2,
    3: gray3,
    4: gray4,
    5: gray5,
  },
  orange: {
    1: orange1,
  },
  white: {
    1: white1,
  },
};
