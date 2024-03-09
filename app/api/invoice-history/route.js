import { NextResponse } from "next/server";
export const revalidate = 0;
export async function GET(request) {
  let result;
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  /* get user data */
  const getUserRaw = await fetch(
    `https://member.digitavision.com/api/users?_key=WToh3scXRoli3LnL1mjE&_filter[email]=${email}`
  );
  const getUserData = await getUserRaw.json();

  if (getUserData["_total"] == 0) {
    result =
      "We regret to inform you that there is no registered user associated with the provided email address in our system.";
  } else {
    /* get user invoice and related data */
    const getUserInvoiceRaw = await fetch(
      `https://member.digitavision.com/api/invoices?_key=WToh3scXRoli3LnL1mjE&_nested[]=invoice-items&_nested[]=invoice-payments&_filter[user_id]=${getUserData["0"].user_id}`
    );

    const getUserInvoiceData = await getUserInvoiceRaw.json();

    const dataArray = Object.values(getUserInvoiceData)
      .filter((item) => typeof item === "object")
      .reverse();

    if (dataArray.length <= 0) {
      result =
        "Apologies, but it appears that there is no record of any invoice in our system associated with your account..";
    } else {
      result = dataArray.map((item) => {
        return `${
          item.nested["invoice-items"][0].item_title.includes("fee")
            ? item.nested["invoice-items"][1].item_title
            : item.nested["invoice-items"][0].item_title
        } bought on ${
          item.nested["invoice-payments"][0].dattm.split(" ")[0]
        }, Price: $${
          item.nested["invoice-payments"][0].amount
        }, Transaction Id: ${
          item.nested["invoice-payments"][0].transaction_id
        }`;
      });
    }
  }

  return NextResponse.json({ status: "success", result }, { status: 200 });
}
