function getCodeAndErrorFromRedirectUri(redirectUri) {
  const url = new URL(redirectUri);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  return {
    code: code,
    error: error,
  };
}

export default getCodeAndErrorFromRedirectUri;
