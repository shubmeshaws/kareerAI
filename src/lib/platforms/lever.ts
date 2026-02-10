export const LEVER_MAPPING = {
    name: "input[name='name']",
    email: "input[name='email']",
    phone: "input[name='phone']",
    org: "input[name='org']",
    resume: "input[type='file'][name='resume']",
    linkedin: "input[name='urls[LinkedIn]']",
    portfolio: "input[name='urls[Portfolio]']",
    github: "input[name='urls[GitHub]']",
    twitter: "input[name='urls[Twitter]']",
};

export function getLeverFillScript(profile: any) {
    return `
    (function() {
      const mapping = ${JSON.stringify(LEVER_MAPPING)};
      const data = ${JSON.stringify(profile)};
      
      for (const [key, selector] of Object.entries(mapping)) {
        const input = document.querySelector(selector);
        if (input \u0026\u0026 data[key]) {
          input.value = data[key];
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      console.log('KareerAI: Lever form attempt completed');
    })();
  `;
}
