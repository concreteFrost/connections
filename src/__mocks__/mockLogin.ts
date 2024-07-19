import getToken from "api/token";

export async function mockLogin() {
  try {
    const res :any= await getToken("iliaM", "cre4min9Tuff");
    console.log(res)
    return res.data.access_token;
  } catch (e) {
    return e;
  }
}
