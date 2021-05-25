import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({


      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]


    })
  }


  loginUsuario() {
    if (this.loginForm.invalid) return;


    Swal.fire({
      title: 'Espere por favor...',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const { correo, password } = this.loginForm.value
    console.log(correo, password);
    this.authService.loginUsuario(correo, password)
      .then(credenciales => {
        Swal.close();
        this.router.navigate(['/']);
        console.log(credenciales);
      })
      .catch(err => {

        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',

        })
      });


  }

}
