export interface Course {
  id: number | string;
  title: string;
  previewImageLink: string;
  description: string;
  rating: number;
  lessonsCount: number;
  meta?: Meta;
  tags?: string[];
  launchDate?: Date;
  status?: string;
  duration?: number;
  containsLockedLessons?: boolean;
}

export interface Courses {
  courses: Course[];
}

interface Meta {
  slug: string;
  skills: string[];
  courseVideoPreview: CourseVideoPreview;
}

interface CourseVideoPreview {
  link: string;
  duration: number;
  previewImageLink: string;
}
