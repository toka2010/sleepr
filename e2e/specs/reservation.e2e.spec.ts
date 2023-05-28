describe("Reservation", () => {
  let jwt ="";
  beforeAll(async () => {
    const user = { email: "toka.fawy@gmail.com", password: "123456" };
    await fetch("http://sleepr-auth-1:3001/user", {
      method: "POST",
      body: JSON.stringify({ name: "lala", ...user }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await fetch("http://sleepr-auth-1:3001/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    jwt = await response.text();
    console.log(
      "🚀 ~ file: reservation.e2e.spec.ts:15 ~ beforeAll ~ jwt:",
      jwt
    );
  });

  test("create", async () => {
    console.log(
        "🚀 ~ file: reservation.e2e.spec.ts:15 ~ beforeAll ~ jwt:",
        jwt
      );
    const response = await fetch(
      "http://sleepr-reservations-1:3000/reservations",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", authentication: jwt },
        body: JSON.stringify({
          name: "reservation",
          userId: "userId2",
          startDate: "7-2-2023",
          charge: {
            amount: 120,
            card: {
              cvc: "413",
              exp_year: 2027,
              exp_month: 10,
              number: "4242 4242 4242 4242",
            },
          },
        }),
      }
    );
    console.log("🚀 ~ file: reservation.e2e.spec.ts:53 ~ test ~ response:", await response ,response.ok)
    const reservation2=  await response.json();
    console.log("🚀 ~ file: reservation.e2e.spec.ts:51 ~ describe ~ reservation:", reservation2);
    expect(response.ok).toBe(true)

    const responseGet =  await fetch('http://sleepr-reservations-1:3000/reservations',{ headers: { "Content-Type": "application/json", authentication: jwt },});
    console.log("🚀 ~ file: reservation.e2e.spec.ts:59 ~ test ~ responseGet:",await  responseGet.json())
});
});
