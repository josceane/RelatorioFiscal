document.addEventListener('DOMContentLoaded', () => {
  const dataInput = document.getElementById('data');
  if(!dataInput.value){
    const hoje = new Date();
    const y = hoje.getFullYear();
    const m = String(hoje.getMonth()+1).padStart(2,'0');
    const d = String(hoje.getDate()).padStart(2,'0');
    dataInput.value = y+'-'+m+'-'+d;
  }

  const inputFotos = document.getElementById('fotos');
  const galeria = document.getElementById('galeria');

  inputFotos.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files).slice(0,12);
    for (const file of files){
      const url = await fileToDataURL(file);
      addFotoCard(url, '');
    }
    e.target.value = '';
  });

  function addFotoCard(src, legenda=''){
    const card = document.createElement('div');
    card.className = 'foto-card';
    const img = document.createElement('img');
    img.src = src;
    const cap = document.createElement('input');
    cap.type = 'text';
    cap.className = 'legenda';
    cap.placeholder = 'Legenda (opcional)';
    cap.value = legenda;
    card.appendChild(img);
    card.appendChild(cap);
    galeria.appendChild(card);
  }

  function fileToDataURL(file){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const btnGerar = document.getElementById('btn-gerar');
  btnGerar.addEventListener('click', (e) => {
    e.preventDefault();
    window.print();
  });

  function limparTudo(){
    const form = document.getElementById('form-relatorio');
    form.reset();
    galeria.innerHTML = '';
    const hoje = new Date();
    const y = hoje.getFullYear();
    const m = String(hoje.getMonth()+1).padStart(2,'0');
    const d = String(hoje.getDate()).padStart(2,'0');
    document.getElementById('data').value = y+'-'+m+'-'+d;
  }

  if ('onafterprint' in window){
    window.onafterprint = limparTudo;
  } else {
    const mql = window.matchMedia('print');
    mql.addListener((mq) => {
      if (!mq.matches) setTimeout(limparTudo, 300);
    });
  }
});