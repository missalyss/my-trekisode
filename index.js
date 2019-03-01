const dateFormatter = (day, month, year) => {
  console.log({day, month});
  let fDay = day;
  let fMonth = month;

  if (day < 10) {
    fDay = `0${day}`;
  }

  if (month < 10) {
    fMonth = `0${month}`
  }

  let eom = 30;

  if (month === 2) {
    eom = 28
  }

  if (month === (1 || 3 || 5 || 7 || 8 || 10 || 12)) {
    eom = 31
  }

  const trueDate = `${year}-${fMonth}-${fDay}`;
  const begOfMonth = `${year}-${fMonth}-01`;
  const endOfMonth = `${year}-${fMonth}-${eom}`
  return { trueDate, begOfMonth, endOfMonth }
}


$('.formy').on('submit', e => {
    e.preventDefault()
    const $bday = parseInt($('#bday').val(), 10);
    const $bmonth = parseInt($('#bmonth').val())
    const $byear = parseInt($('#byear').val())

    const formatted = dateFormatter($bday, $bmonth, $byear)
    console.log({formatted});
    $.ajax({
        url: `http://stapi.co/api/v1/rest/episode/search`,
        method: "POST",
        dataType: 'json',
        data: {
          usAirDateFrom: formatted.begOfMonth,
          usAirDateTo: formatted.endOfMonth
        }
      })
      .then(data => {
        $('.instructions').empty()
        $('.resulty').empty()
        if (!data.episodes.length) {
          $('.resulty').append(`DAMMIT, JIM! Nothing aired on that day. Check the days before and after`)
          return;
        }
        console.log('DATA: ', data.episodes);
        const perfectFit = data.episodes.find(ep => ep.usAirDate === formatted.trueDate)
        if (perfectFit) {
          const { series, season, title } = perfectFit;
          $('.resulty').append(`<p class="enbold">THE STARS ALIGN!</p> <p>On this date, ${title} was aired.</p> <p>${series.title} ${season.title}.</p>`)
          return;
        }
        const correctAnswer = data.episodes[0];
        const { series, season, title, usAirDate } = correctAnswer;
        $('.resulty').append(`<p class="enbold">NOT QUITE</p> <p>The closest we could find was: ${series.title}</p> <p>${season.title}</p> <p><span class="enbold">TITLE:</span> ${title}, which aired on ${usAirDate}</p>`)
      })
      .catch(err => {
        console.error('red alert! ', err.status, err.responseText);
      });
    })
