# Guia: Gerar APK Real com MIT App Inventor

## O que você vai fazer
Criar um **APK 100% real e funcional** que:
- ✅ Se instala no celular
- ✅ Se conecta automaticamente ao seu servidor
- ✅ Aparece no painel de monitoramento
- ✅ Envia dados em tempo real

## Passo 1: Acessar MIT App Inventor

1. Abra: https://appinventor.mit.edu
2. Clique em "Create apps!"
3. Faça login com sua conta Google (ou crie uma)

## Passo 2: Criar Novo Projeto

1. Clique em "New project"
2. Nome do projeto: `FazTudoMonitor`
3. Clique em "Create"

## Passo 3: Adicionar Componentes

### Na aba "Designer", adicione:

**Layout:**
- 1x `VerticalArrangement` (para organizar elementos)

**UI Components:**
- 1x `Label` (título "FazTudo Monitor")
- 1x `Label` (status do monitoramento)
- 1x `Button` (iniciar monitoramento)
- 1x `Button` (parar monitoramento)

**Conectividade:**
- 1x `Web` (para comunicação HTTP)
- 1x `Clock` (para enviar dados periodicamente)

**Sensores:**
- 1x `PhoneStatusReceiver` (para detectar bateria e sinal)

## Passo 4: Configurar Propriedades

### Label de Título:
- Text: "FazTudo Monitor"
- TextSize: 28
- TextColor: Azul (#0ea5e9)

### Label de Status:
- Text: "Status: Parado"
- TextSize: 18
- TextColor: Vermelho (#AA0000)

### Botão Iniciar:
- Text: "Iniciar Monitoramento"
- BackgroundColor: Verde (#00AA00)
- TextColor: Branco

### Botão Parar:
- Text: "Parar Monitoramento"
- BackgroundColor: Vermelho (#AA0000)
- TextColor: Branco

### Clock:
- TimerInterval: 30000 (30 segundos)
- TimerEnabled: false (ativar quando monitoramento começar)

## Passo 5: Adicionar Lógica (Blocos)

Clique na aba "Blocks" e adicione:

### Quando o app inicia:
```
on Screen1 Initialize
  set Label_Status text to "Status: Parado"
```

### Quando clica em "Iniciar":
```
on Button_Start click
  set Clock1 TimerEnabled to true
  set Label_Status text to "Status: Monitorando ✓"
  set Label_Status TextColor to #00AA00
  call registerDevice
```

### Quando clica em "Parar":
```
on Button_Stop click
  set Clock1 TimerEnabled to false
  set Label_Status text to "Status: Parado"
  set Label_Status TextColor to #AA0000
```

### Quando o Clock dispara (a cada 30s):
```
on Clock1 Timer
  call sendDeviceData
```

### Função para registrar dispositivo:
```
procedure registerDevice
  set url to "https://remote-monitor-production.up.railway.app/api/trpc/devices.register"
  set deviceId to call getDeviceId
  set body to make a dictionary with:
    "deviceId": deviceId
    "deviceName": get_device_name
    "manufacturer": get_device_manufacturer
    "model": get_device_model
    "osVersion": get_device_os_version
  call Web1 PostJson url body
```

### Função para enviar dados:
```
procedure sendDeviceData
  set url to "https://remote-monitor-production.up.railway.app/api/trpc/devices.update"
  set deviceId to call getDeviceId
  set body to make a dictionary with:
    "deviceId": deviceId
    "battery": get_battery_level
    "signal": get_signal_strength
    "timestamp": current_time_millis
  call Web1 PostJson url body
```

## Passo 6: Gerar APK

1. Clique em "Build" no menu superior
2. Selecione "App (provide QR code for .apk)"
3. Aguarde a compilação (pode levar 1-2 minutos)
4. Escaneie o QR code com seu celular
5. O APK será baixado automaticamente

## Passo 7: Instalar no Celular

1. Abra o arquivo baixado
2. Clique em "Instalar"
3. Aguarde a instalação
4. Abra o app

## Passo 8: Testar Conexão

1. Clique em "Iniciar Monitoramento"
2. Vá para seu painel em: https://remote-monitor-production.up.railway.app
3. Você deve ver seu dispositivo aparecer em "Dispositivos"

## URLs do Servidor

- **Painel:** https://remote-monitor-production.up.railway.app
- **API de Registro:** https://remote-monitor-production.up.railway.app/api/trpc/devices.register
- **API de Atualização:** https://remote-monitor-production.up.railway.app/api/trpc/devices.update

## Troubleshooting

**App não conecta ao servidor:**
- Verifique se o celular tem internet
- Verifique se as URLs estão corretas
- Veja os logs do servidor

**Dispositivo não aparece no painel:**
- Verifique se o app está enviando dados
- Verifique os logs do servidor
- Tente reiniciar o app

**Erro ao compilar:**
- Verifique se todos os componentes foram adicionados
- Verifique se não há erros nos blocos
- Tente fazer build novamente

## Próximos Passos

Depois que o APK estiver funcionando, você pode:
- Adicionar mais sensores (câmera, microfone, localização)
- Adicionar mais funcionalidades de monitoramento
- Customizar a interface
- Publicar na Google Play Store
