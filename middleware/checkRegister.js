export default async function({ redirect, app }) {
  if (await app.$user()) {
    // すでにアカウント作成済みの場合はTOPページにリダイレクト
    redirect("/");
  }
}
