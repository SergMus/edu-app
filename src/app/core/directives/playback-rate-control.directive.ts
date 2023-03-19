import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[playbackRateControl]',
})
export class PlaybackRateControlDirective {
  @Input() playbackRate = 1;

  constructor(public elemRef: ElementRef) {}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'ArrowUp') {
      this.playbackRate = Math.min(this.playbackRate + 0.5, 4);
      this.updatePlaybackRate();
    } else if (event.ctrlKey && event.key === 'ArrowDown') {
      this.playbackRate = Math.max(this.playbackRate - 0.5, 0.5);
      this.updatePlaybackRate();
    }
  }

  public updatePlaybackRate(): void {
    const video = this.elemRef.nativeElement as HTMLVideoElement;
    video.playbackRate = this.playbackRate;
  }
}
