$('.formy').on('submit', e => {
    e.preventDefault()
    const $bday = $('#bday').val()
    console.log('$$$bday: ', $bday);
    const bday = new Date($bday);
    console.log({bday});
    console.log('bday day: ', bday.getDate());
    $.ajax({
        url: `http://stapi.co/api/v1/rest/episode/search`,
        method: "POST",
        dataType: 'json',
        data: {
          usAirDateTo: $bday,
          usAirDateFrom: $bday
        }
      })
      .then(data => {
        console.log(typeof data);
        console.log({data});

        if (!data.episodes.length) {
          $('.resulty').append(`Dammit, Jim! Nothing aired on that day. Check the days before and after`)
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
