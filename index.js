const dateFormatter = (day, month, math) => {
}


$('.formy').on('submit', e => {
    e.preventDefault()
    const $bday = parseInt($('#bday').val(), 10);
    const $bmonth = $('#bmonth').val()
    const $byear = $('#byear').val()

    const trueDate = `${$byear}-${$bmonth}-${$bday}`;
    const begOfMonth = `${$byear}-${$bmonth}-01`;
    const endOfMonth = `${$byear}-${$bmonth}-29`
    console.log({begOfMonth});
    console.log({endOfMonth});
    console.log('alyssa');
    $.ajax({
        url: `http://stapi.co/api/v1/rest/episode/search`,
        method: "POST",
        dataType: 'json',
        data: {
          usAirDateFrom: begOfMonth,
          usAirDateTo: endOfMonth
        }
      })
      .then(data => {
        $('.instructions').empty()
        $('.resulty').empty()
        if (!data.episodes.length) {
          $('.resulty').append(`DAMMIT, JIM! Nothing aired on that day. Check the days before and after`)
          return;
        }
        const perfectFit = data.episodes.find(ep => ep.usAirDate === trueDate)
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
