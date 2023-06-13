import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_NAME = "@token";

type GetTokenOk = {
  ok: true;
  token: string;
};

type GetTokenError = {
  ok: false;
  message: string;
};

export const getToken = async (): Promise<GetTokenOk | GetTokenError> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_NAME);

    if (!token)
      return {
        ok: false,
        message: "No token found",
      };

    return {
      ok: true,
      token,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: JSON.stringify(error),
    };
  }
};

type SetTokenOk = {
  ok: true;
};

type SetTokenError = {
  ok: false;
  message: string;
};

export const setToken = async (
  value: string
): Promise<SetTokenOk | SetTokenError> => {
  try {
    await AsyncStorage.setItem(TOKEN_NAME, value);

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: JSON.stringify(error),
    };
  }
};

type DelTokenOk = SetTokenOk;

type DelTokenError = SetTokenError;

export const delToken = async (): Promise<DelTokenOk | DelTokenError> => {
  try {
    await AsyncStorage.removeItem(TOKEN_NAME);

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: JSON.stringify(error),
    };
  }
};
