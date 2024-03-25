class BoxSubject {
    constructor(containerSelector, boxSelector, loadMoreBtnSelector, initialVisibleCount) {
      this.containerSelector = containerSelector;
      this.boxSelector = boxSelector;
      this.loadMoreBtnSelector = loadMoreBtnSelector;
      this.initialVisibleCount = initialVisibleCount;
      this.currentItem = initialVisibleCount;
      this.boxes = Array.from(document.querySelectorAll(containerSelector + ' ' + boxSelector));
      this.loadMoreBtn = document.querySelector(loadMoreBtnSelector);
      this.init();
      this.loadMoreBtn.addEventListener('click', this.loadMore.bind(this));
    }
  
    init() {
      this.boxes.slice(0, this.initialVisibleCount).forEach(box => box.style.display = 'inline-block');
      this.loadMoreBtn.style.display = this.boxes.length > this.initialVisibleCount ? 'block' : 'none';
    }
  
    loadMore() {
      this.forEachObserver(observer => observer.loadMore(this));
    }
  
    addObserver(observer) {
      this.observers = this.observers || [];
      this.observers.push(observer);
    }
  
    removeObserver(observer) {
      if (this.observers) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
          this.observers.splice(index, 1);
        }
      }
    }
  
    forEachObserver(fn) {
      if (this.observers) {
        this.observers.forEach(fn);
      }
    }
  }
  
  class BoxObserver {
    constructor(containerSelector, boxSelector, loadMoreBtnSelector) {
      this.containerSelector = containerSelector;
      this.boxSelector = boxSelector;
      this.loadMoreBtnSelector = loadMoreBtnSelector;
      this.currentItem = initialVisibleCount;
    }
  
    loadMore(subject) {
      for (let i = this.currentItem; i < this.currentItem + 4 && i < subject.boxes.length; i++) {
        subject.boxes[i].style.display = 'inline-block';
      }
      this.currentItem += 4;
  
      if (this.currentItem >= subject.boxes.length) {
        const loadMoreBtn = document.querySelector(subject.loadMoreBtnSelector);
        if (loadMoreBtn) {
          loadMoreBtn.style.display = 'none';
        }
      }
    }
  
    linkedSubject(subject) {
      subject.addObserver(this);
    }
  }
  
  const initialVisibleCount = 4;
  
  const boxSubject1 = new BoxSubject('.box-container-1', '.box-1', '#load-more-1', initialVisibleCount);
  const boxObserver1 = new BoxObserver('.box-container-1', '.box-1', '#load-more-1');
  
  const boxSubject2 = new BoxSubject('.box-container-2', '.box-2', '#load-more-2', initialVisibleCount);
  const boxObserver2 = new BoxObserver('.box-container-2', '.box-2', '#load-more-2');
  
  const boxSubject3 = new BoxSubject('.box-container-3', '.box-3', '#load-more-3', initialVisibleCount);
  const boxObserver3 = new BoxObserver('.box-container-3', '.box-3', '#load-more-3');
  
  boxObserver1.linkedSubject(boxSubject1);
  boxObserver2.linkedSubject(boxSubject2);
  boxObserver3.linkedSubject(boxSubject3);
  