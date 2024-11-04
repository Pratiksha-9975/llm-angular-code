import { Routes } from '@angular/router';
import { ExamAiComponent } from './exam-ai/exam-ai.component';
import { ScoreComponent } from './score/score.component';
import { RegisterComponent } from './register/register.component';
import { StudentComponent } from './student/student.component';
import { UserComponent } from './user/user.component';


export const routes: Routes = [
    {
        path:'exam', component:ExamAiComponent
    },
    {
        path:'score', component:ScoreComponent
    },
    {
        path:'register', component:RegisterComponent
    },
    {
        path:'student', component:StudentComponent
    },
    {
        path:'user', component:UserComponent
    },

    {
        path:'' , redirectTo:'/register', pathMatch:'full'
    
    }

];

