interface Project {
  id: string
  name: string
  description: string | null
  websiteUrl: string | null
  slug: string
  apiKey: string
  isPublic: boolean
  widgetColor: string | null
  widgetPosition: string | null
  widgetButtonText: string | null
  ownerId: string
  createdAt: string
  updatedAt: string
  feedbackCount: number
  unreadCount: number
}

interface CreateProjectData {
  name: string
  description?: string
  websiteUrl?: string
}

interface UpdateProjectData {
  name?: string
  description?: string
  websiteUrl?: string
  isPublic?: boolean
  widgetColor?: string
  widgetPosition?: string
  widgetButtonText?: string
}

export function useProjects() {
  const projects = useState<Project[]>('projects', () => [])
  const loading = useState<boolean>('projects-loading', () => false)
  const error = useState<string | null>('projects-error', () => null)

  async function fetchProjects() {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<Project[]>('/api/projects')
      projects.value = data
    } catch (e: any) {
      error.value = e?.data?.message || 'Failed to fetch projects'
    } finally {
      loading.value = false
    }
  }

  async function createProject(data: CreateProjectData) {
    loading.value = true
    error.value = null
    try {
      const project = await $fetch<Project>('/api/projects', {
        method: 'POST',
        body: data,
      })
      projects.value = [{ ...project, feedbackCount: 0, unreadCount: 0 }, ...projects.value]
      return project
    } catch (e: any) {
      error.value = e?.data?.message || 'Failed to create project'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function updateProject(id: string, data: UpdateProjectData) {
    error.value = null
    try {
      const updated = await $fetch<Project>(`/api/projects/${id}`, {
        method: 'PUT',
        body: data,
      })
      const index = projects.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        projects.value[index] = { ...projects.value[index], ...updated }
      }
      return updated
    } catch (e: any) {
      error.value = e?.data?.message || 'Failed to update project'
      throw e
    }
  }

  async function deleteProject(id: string, confirmName: string) {
    error.value = null
    try {
      await $fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        body: { confirmName },
      })
      projects.value = projects.value.filter((p) => p.id !== id)
    } catch (e: any) {
      error.value = e?.data?.message || 'Failed to delete project'
      throw e
    }
  }

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  }
}
