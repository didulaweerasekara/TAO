/* ==========================================================================
   TAO: site settings
   Contact details, social links and the enquiry form. The header, footer,
   Contact page and every form on the site read from this file.

   Only publish details that are real and monitored. Anything left as ""
   is simply not shown on the live site.
   ========================================================================== */
window.TAO = {
  name: "TAO",
  tagline: "Thrive in Life & Career",
  siteUrl: "https://didulaweerasekara.github.io/TAO/",

  // ---- Contact details -----------------------------------------------------
  email: "",        // e.g. "hello@example.org": shown in footer and Contact page
  phone: "",        // e.g. "+94 77 123 4567"
  whatsapp: "",     // full international number, digits only, e.g. "94771234567"
  location: "",     // e.g. "Colombo, Sri Lanka": optional

  // ---- Social links (leave "" to hide) -------------------------------------
  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
    youtube: ""
  },

  // ---- Forms ---------------------------------------------------------------
  // GitHub Pages cannot receive form submissions on its own. Create a free
  // form at https://formspree.io and paste its endpoint here, e.g.
  //   formEndpoint: "https://formspree.io/f/abcdwxyz"
  // Enquiries and newsletter sign-ups are both sent to this endpoint.
  // If it is empty but `email` is set, forms open the visitor's email app.
  formEndpoint: ""
};
