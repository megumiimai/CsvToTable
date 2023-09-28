function csvToTable() {
    const originText = document.forms[0].originText.value;
    if (originText == "") {
        return false;
    }

    const isHeaderRow = document.getElementById("headerRow").checked;
    const oldTextArr = originText.split("\n");
    const replaceChars = [ /\r/, /^\'/, /^\"/, /"$/, /'$/ ];
    for(i = 0; i < oldTextArr.length; i++){
        replaceChars.forEach(function (oldChar) {
            oldTextArr[i] = oldTextArr[i].replace(oldChar,"");
        });
        const replacement = isHeaderRow && i == 0 ? `<th>${oldTextArr[i]}</th>` :  `<td>${oldTextArr[i]}</td>`;
        oldTextArr[i] = `  <tr>\n    ${replacement}\n  </tr>`;
    }

    let splitChar = '	';
    splitCharElements = document.getElementsByName("splitChar");
    for (i = 0; i < splitCharElements.length; i++) {
        if (splitCharElements[i].checked) {
            splitChar = splitCharElements[i].value;
            break;
        }
    }
    const definition = document.forms[0].definition.value;
    if(definition && definition.length > 0){
        splitChar = definition;
    }

    var newText = "";
    for(i = 0; i < oldTextArr.length; i++){
        const replacement = isHeaderRow && i == 0 ? "</th>\n    <th>" : "</td>\n    <td>";
        oldTextArr[i] = oldTextArr[i].replace(new RegExp(splitChar, "gi"), replacement);
        newText = newText + oldTextArr[i] + "\n";
    }
    newText = "<table>\n"+newText+"</table>\n";

    document.forms[0].newText.value = newText;
}
