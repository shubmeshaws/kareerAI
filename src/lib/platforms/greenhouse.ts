export const GREENHOUSE_MAPPING = {
    firstName: "input[id='first_name']",
    lastName: "input[id='last_name']",
    email: "input[id='email']",
    phone: "input[id='phone']",
    location: "input[id='job_application_location']",
    resume: "input[type='file'][id='resume_upload']",
    linkedin: "input[id='job_application_answers_attributes_0_text_value']", // Common LinkedIn field ID
    portfolio: "input[id='job_application_answers_attributes_1_text_value']",
};

export function getGreenhouseFillScript(profile: any) {
    return `
    (function() {
      const mapping = ${JSON.stringify(GREENHOUSE_MAPPING)};
      const data = ${JSON.stringify(profile)};
      
      for (const [key, selector] of Object.entries(mapping)) {
        const input = document.querySelector(selector);
        if (input \u0026\u0026 data[key]) {
          input.value = data[key];
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      console.log('KareerAI: Greenhouse form attempt completed');
    })();
  `;
}
