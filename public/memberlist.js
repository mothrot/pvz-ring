document.addEventListener("DOMContentLoaded", function () {
  const membersListEl = document.querySelector("#pvz-list");

  if (membersListEl) {
    createMembersList(membersListEl);
  }
});

function createMembersList(el) {
  let output = `
    <table>
      <thead>
        <tr>
          <th>Member</th>
          <th>Website</th>
          <th>Description</th>
          <th>Warning</th>
        </tr>
      </thead>
      <tbody>
  `;

  members.forEach((member) => {
    if (!member.description) {
      throw new Error(`Member "${member.name}" is missing a description.`);
    }

    if (!member.warning) {
      throw new Error(`Member "${member.name}" is missing a warning.`);
    }

    const url = member.url.startsWith("http")
      ? member.url
      : `https://${member.url}`;

    let prettyUrl = url
      .replace("https://", "")
      .replace("http://", "");

    if (prettyUrl.endsWith("/")) {
      prettyUrl = prettyUrl.slice(0, -1);
    }

    output += `
      <tr>
        <td>
          ${member.name}
          ${
            member.buttonUrl
              ? `<br><img src="${member.buttonUrl}" width="88" alt="${member.name} button">`
              : ""
          }
        </td>
        <td>
          <a href="${url}" target="_blank">
            ${member.title}
          </a>
        </td>
        <td>${member.description}</td>
        <td>${member.warning}</td>
      </tr>
    `;
  });

  output += `
      </tbody>
    </table>
  `;

  el.innerHTML = output;
}