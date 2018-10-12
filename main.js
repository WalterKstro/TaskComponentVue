((c) => {
  // DEFINIENDO UN COMPONENTE TITULO
  Vue.component('titulo', {
    template: ' <h1 class="text-center">{{ titulo }}</h1>',
    data: () => {

      return {
        titulo: 'List of task today'
      }
    }
  })


  const data = {
    newTask: '',
    tasks: [{
      task: 'Aprender Vue',
      state: false
    },
    {
      task: 'Aprender Java',
      state: false
    },
    {
      task: 'Aprender Raeact',
      state: false
    },
    {
      task: 'Aprender Angular',
      state: false
    }
    ]
  }

  // DEFINIENDO NUEVO COMPONENTE AGREGAR TAREA
  Vue.component('busqueda', {
    template: `
      <div class="input-group">
        <input class="form-control" type="text" placeholder="Add new task" v-model="newTask" @keyup.enter="addNew">
        <div class="input-group-append">
          <button type="button" class="input-group-text" @click="addNew">Add Task</button>
        </div>
      </div>
    `,
    methods: {
      addNew() {
        let value = this.newTask.trim()
        if (value) {
          this.tasks.push({
            task: value,
            state: false
          })
        }
        this.newTask = ''
      }
    },
    data: () => {
      return data;
    }
  })

  // DEFINIENDO COMPONENTE LISTA TAREAS
  Vue.component('listado', {
    template:
      `
    <table class="table table-striped table-sm table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>Task</th>
                <th>Status</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) in tasks" :key="index">
                <td scope="row">{{task.task}}</td>
                <td><span :class="{success: task.state}" class="badge badge-pill badge-danger">{{task.state}}</span></td>
                <td>
                  <button class="btn btn-sm btn-danger" @click="deleteTask(index)"><i class="far fa-trash-alt"></i></button>
                  <button class="btn btn-sm btn-success" @click="confirmTask(index)"><i class="fas fa-check"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
    `,
    data: () => {
      return data;
    },
    methods: {
      deleteTask(index) {
        if (confirm('Desea eliminar la tarea?')) {
          this.tasks.splice(index, 1)
        } else {
          alert('Tarea no eliminada')
        }
      },
      confirmTask(index) {
        let status = this.tasks[index].state;
        if (status) {
          this.tasks[index].state = false
        } else {
          this.tasks[index].state = true
        }
      }
    }
  })


  let app = new Vue({
    el: "#app",
    data: data,
  });

})(console.log);