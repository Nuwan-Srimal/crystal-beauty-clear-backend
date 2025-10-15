// getDesignedEmail.js
export default function getDesignedEmail({
	otp,
	firstName = "there",
	brandName = "Your Company",
	supportEmail = "support@example.com",
	preheader, // optional custom preheader
	colors = {},
}) {
	const accent = colors.accent || "#fa812f";
	const primary = colors.primary || "#fef3e2";
	const secondary = colors.secondary || "#393e46";

	const safeOtp = String(otp || "").replace(/\s+/g, "");
	const preheaderText =
		preheader ||
		`Your one-time passcode is ${safeOtp}. It expires in 10 minutes.`;

	return `
  <!-- Preheader (hidden) -->
  <div style="display:none;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">
    ${preheaderText}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${primary};margin:0;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #f3e6d2;">
          <!-- Header -->
          <tr>
            <td style="background:${secondary};padding:20px 24px;">
              <table width="100%" role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="font:600 18px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:#ffffff;">
                    ${brandName}
                  </td>
                  <td align="right" style="font:500 12px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:#cdd3da;">
                    Security Notice
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 28px 8px 28px;font:400 16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:#2b2f35;">
              <div style="font-weight:600;font-size:20px;color:${secondary};margin-bottom:8px;">Verify your request</div>
              <div style="margin-bottom:16px;">
                Hi ${firstName}, use the one-time passcode below to reset your password. For security, it expires in <strong>10 minutes</strong>.
              </div>

              <!-- OTP Block -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:16px 0 12px 0;">
                <tr>
                  <td align="center" style="padding:16px;">
                    <div style="
                      display:inline-block;
                      letter-spacing:8px;
                      font:700 28px/1.2 'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;
                      color:${secondary};
                      background:#fff6ea;
                      border:2px dashed ${accent};
                      border-radius:10px;
                      padding:14px 22px;">
                      ${safeOtp}
                    </div>
                  </td>
                </tr>
              </table>
             

              <div style="margin:18px 0 0 0;font-size:14px;color:#4b515a;">
                Didn’t request this? No action required—your account remains secure.
              </div>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 28px;">
              <hr style="border:none;border-top:1px solid #f0e4d3;margin:16px 0;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 28px 24px 28px;font:400 12px/1.6 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:#6a7078;">
              <div style="margin-bottom:8px;">
                Need help? Contact
                <a href="mailto:${supportEmail}" style="color:${accent};text-decoration:none;">
                  ${supportEmail}
                </a>.
              </div>
              <div style="color:#9aa0a6;">
                © ${new Date().getFullYear()} ${brandName}. All rights reserved.
              </div>
            </td>
          </tr>
        </table>

        <!-- Brand ribbon -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;margin-top:12px;">
          <tr>
            <td style="height:4px;background:${accent};"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;
}