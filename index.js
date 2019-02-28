const dateFormatter = (day, month, math) => {
}


$('.formy').on('submit', e => {
    e.preventDefault()
    const $bday = parseInt($('#bday').val(), 10);
    const $bmonth = $('#bmonth').val()
    const $byear = $('#byear').val()

    const trueDate = `${$byear}-${$bmonth}-${$bday}`;
    const weekBefore = `${$byear}-${$bmonth}-${$bday - 7}`;
    const weekAfter = `${$byear}-${$bmonth}-${$bday + 7}`
    console.log({weekBefore});
    console.log({weekAfter});

    $.ajax({
        url: `http://stapi.co/api/v1/rest/episode/search`,
        method: "POST",
        dataType: 'json',
        data: {
          usAirDateFrom: weekBefore,
          usAirDateTo: weekAfter
        }
      })
      .then(data => {
        $('.resulty').empty()
        if (!data.episodes.length) {
          $('.resulty').append(`Dammit, Jim! Nothing aired on that day. Check the days before and after`)
          return;
        }
        const perfectFit = data.episodes.find(ep => ep.usAirDate === trueDate)
        if (perfectFit) {
          const { series, season, title } = perfectFit;
          $('.resulty').append(`The stars align! On this date, ${title} was aired. ${series.title} ${season.title}.`)
          return;
        }
        const correctAnswer = data.episodes[0];
        const { series, season, title } = correctAnswer;
        $('.resulty').append(`Your result: ${series.title} Season ${season.title}. ${title}`)
      })
      .catch(err => {
        console.error('red alert! ', err);
      });
    })
