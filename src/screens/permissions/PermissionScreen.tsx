import { globalStyles } from '@/config/theme/app-theme'
import { usePermissionStore } from '@/stores/permissions/usePermissionsStore'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

export const PermissionScreen = () => {

  const { locationStatus, requestLocationPermission } = usePermissionStore();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
       <Text>Habilitar Ubicacion</Text>

       <Pressable style={ globalStyles.btnPrimary} onPress={ requestLocationPermission }>
          <Text style={{
            color: 'white'
          }}>Permitir Ubicacion</Text>
       </Pressable>

       <Text>Estado actual: { locationStatus }</Text>
    </View>
  )
}
