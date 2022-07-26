function onDocumentReady(callback) {
  if (document.readyState === 'complete' || document.readyState === 'interactive')
    setTimeout(callback, 1)
  else
    document.addEventListener('DOMContentLoaded', callback)
}

onDocumentReady(() => {
  var elements = {}
  for (var element of document.querySelectorAll('.github-stars')) {
    const githubId = element.getAttribute('data-github-id')
    elements[githubId] = element
    fetch(`https://api.github.com/repos/${githubId}`)
      .then(response => response.json())
      .then(data => {
        if (!data.full_name) return
        elements[data.full_name].innerHTML = data.stargazers_count
    })
  }
})
