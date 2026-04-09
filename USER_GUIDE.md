# Guia de Uso - Painel de Monitoramento Remoto

## Bem-vindo!

Este guia ajudará você a usar o **Painel de Monitoramento Remoto** para gerenciar seus dispositivos móveis em tempo real.

## Índice

1. [Primeiros Passos](#primeiros-passos)
2. [Dashboard](#dashboard)
3. [Gerenciar Dispositivos](#gerenciar-dispositivos)
4. [Visualizar Eventos](#visualizar-eventos)
5. [Configurar Alertas](#configurar-alertas)
6. [Mapa em Tempo Real](#mapa-em-tempo-real)
7. [Troubleshooting](#troubleshooting)

## Primeiros Passos

### Login

1. Acesse o painel em: `https://seu-dominio.manus.space`
2. Clique em **Login**
3. Você será redirecionado para a página de autenticação Manus
4. Faça login com sua conta
5. Você será redirecionado de volta ao painel

### Primeira Vez?

Se é sua primeira vez usando o painel:

1. ✅ Faça login
2. ✅ Vá para **Dispositivos**
3. ✅ Clique em **+ Novo Dispositivo**
4. ✅ Preencha os dados e gere um token
5. ✅ Instale o agente no seu dispositivo móvel
6. ✅ Configure os alertas desejados

## Dashboard

O **Dashboard** é a página inicial que mostra um resumo de todos os seus dispositivos.

### Elementos Principais

```
┌─────────────────────────────────────────────────────────┐
│ PAINEL DE CONTROLE - MONITORAMENTO REMOTO              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 📊 VISÃO GERAL                                         │
│ ├─ Dispositivos Online: 5                              │
│ ├─ Dispositivos Offline: 2                             │
│ ├─ Alertas Não Lidos: 3                                │
│ └─ Últimos Eventos: 12                                 │
│                                                         │
│ 🟢 DISPOSITIVOS ONLINE                                 │
│ ├─ iPhone 14 Pro (iOS 17.0)                           │
│ ├─ Samsung Galaxy S23 (Android 13)                    │
│ └─ ...                                                  │
│                                                         │
│ 🔴 DISPOSITIVOS OFFLINE                                │
│ ├─ iPad Air (Offline há 2h)                           │
│ └─ ...                                                  │
│                                                         │
│ 🔔 ALERTAS RECENTES                                    │
│ ├─ [CRÍTICO] iPhone 14 ficou offline                  │
│ ├─ [AVISO] Samsung mudou de localização               │
│ └─ ...                                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Ações Disponíveis

- **Clique em um dispositivo**: Ver detalhes completos
- **Clique em um alerta**: Marcar como lido ou deletar
- **Clique em "Ver Mais"**: Acessar página completa

## Gerenciar Dispositivos

### Listar Dispositivos

1. Clique em **Dispositivos** no menu
2. Você verá uma lista de todos os seus dispositivos
3. Cada dispositivo mostra:
   - Nome e tipo (Android/iOS)
   - Status (Online/Offline)
   - Última localização
   - Bateria
   - Última sincronização

### Criar Novo Dispositivo

1. Clique em **+ Novo Dispositivo**
2. Preencha o formulário:
   - **Nome**: Nome descritivo (ex: "iPhone da Maria")
   - **Tipo**: Selecione Android ou iOS
   - **Descrição** (opcional): Notas adicionais
3. Clique em **Criar**
4. Um token será gerado automaticamente
5. Copie o token e siga o [Guia de Instalação do Agente](AGENT_INSTALLATION.md)

### Editar Dispositivo

1. Clique no dispositivo na lista
2. Clique em **Editar**
3. Altere os dados desejados
4. Clique em **Salvar**

### Deletar Dispositivo

1. Clique no dispositivo na lista
2. Clique em **Deletar**
3. Confirme a exclusão
4. O dispositivo será removido permanentemente

### Gerar Novo Token

Se o token expirou ou foi comprometido:

1. Clique no dispositivo
2. Clique em **Gerar Novo Token**
3. Um novo token será criado
4. O token anterior será invalidado
5. Reinstale o agente com o novo token

## Visualizar Eventos

### Página de Eventos

1. Clique em **Eventos** no menu
2. Você verá o histórico de eventos dos últimos 24 horas
3. Cada evento mostra:
   - Tipo (localização, status, app instalado, etc)
   - Dispositivo relacionado
   - Hora e data
   - Localização (se aplicável)
   - Detalhes adicionais

### Filtrar Eventos

1. Use o filtro **Tipo de Evento** para mostrar apenas certos tipos
2. Use o filtro **Dispositivo** para filtrar por dispositivo específico
3. Use o filtro **Data** para ver eventos de um período específico

### Detalhes do Evento

1. Clique em um evento
2. Uma janela mostrará:
   - Descrição completa
   - Dados técnicos (JSON)
   - Localização em mapa (se disponível)
   - Timestamp exato

## Configurar Alertas

### Tipos de Alertas

| Tipo | Descrição | Quando Ativa |
|------|-----------|------------|
| **Offline** | Dispositivo fica offline | Após 5 minutos sem comunicação |
| **Localização** | Dispositivo muda de local | Quando se move mais de 1km |
| **Bateria Baixa** | Bateria abaixo de 20% | Quando nível cai abaixo do limite |
| **Evento Crítico** | Evento importante | Quando evento crítico é detectado |

### Configurar Alerta

1. Vá para **Dispositivos**
2. Clique no dispositivo desejado
3. Vá para a aba **Alertas**
4. Clique em **+ Novo Alerta**
5. Selecione:
   - **Tipo de Alerta**: Escolha na lista
   - **Ativar**: Marque para ativar
   - **Método de Notificação**: Email, Push ou Ambos
   - **Threshold** (se aplicável): Configure o limite
6. Clique em **Salvar**

### Receber Notificações

#### Por Email

- Você receberá um e-mail quando o alerta for acionado
- O e-mail contém:
  - Tipo de alerta
  - Dispositivo afetado
  - Timestamp
  - Detalhes do evento

#### No Painel

- Uma notificação aparecerá no canto superior direito
- Clique para ver detalhes
- Marque como lida quando resolver

### Gerenciar Alertas

1. Clique em **Alertas** no menu
2. Você verá todos os alertas recentes
3. Clique em um alerta para:
   - Ver detalhes completos
   - Marcar como lido
   - Deletar

## Mapa em Tempo Real

### Visualizar Dispositivos no Mapa

1. Clique em **Mapa** no menu
2. Um mapa interativo mostrará:
   - Marcadores dos seus dispositivos
   - Status (verde = online, vermelho = offline)
   - Nome do dispositivo

### Interagir com o Mapa

- **Zoom**: Use o mouse ou botões de zoom
- **Arrastar**: Clique e arraste para mover
- **Clique em Marcador**: Ver detalhes do dispositivo
- **Zoom Automático**: Clique em "Centralizar" para focar nos dispositivos

### Histórico de Localização

1. Clique em um dispositivo no mapa
2. Clique em **Ver Histórico**
3. Você verá:
   - Todas as localizações dos últimos 7 dias
   - Rota do dispositivo
   - Tempo em cada local

## Troubleshooting

### Problema: Não consigo fazer login

**Solução:**
1. Verifique se está usando a URL correta
2. Limpe cookies do navegador
3. Tente em outro navegador
4. Verifique sua conexão com internet

### Problema: Dispositivo mostra Offline

**Solução:**
1. Verifique se o agente está instalado
2. Verifique se o agente está rodando
3. Verifique conexão com internet do dispositivo
4. Reinicie o agente
5. Gere um novo token se necessário

### Problema: Não recebo notificações

**Solução:**
1. Verifique se o alerta está ativado
2. Verifique se o método de notificação está configurado
3. Verifique seu e-mail (spam?)
4. Verifique permissões de notificação do navegador
5. Tente desativar e reativar o alerta

### Problema: Localização está errada

**Solução:**
1. Verifique se GPS está ativado no dispositivo
2. Aguarde alguns minutos para atualizar
3. Abra Google Maps no dispositivo para testar
4. Reinicie o agente
5. Verifique permissões de localização

### Problema: Mapa não carrega

**Solução:**
1. Verifique conexão com internet
2. Limpe cache do navegador
3. Tente em outro navegador
4. Verifique se há dispositivos com localização

## Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `D` | Ir para Dispositivos |
| `E` | Ir para Eventos |
| `A` | Ir para Alertas |
| `M` | Ir para Mapa |
| `?` | Mostrar ajuda |
| `Esc` | Fechar modal/popup |

## Dicas e Truques

### Otimizar Bateria

- Reduza a frequência de sincronização
- Ative o modo "Economia de Bateria"
- Desative coleta de eventos avançados

### Melhorar Precisão de Localização

- Ative GPS de alta precisão
- Ative WiFi mesmo sem conexão
- Aguarde 1-2 minutos após ligar o dispositivo

### Organizar Dispositivos

- Use nomes descritivos (ex: "iPhone - João", não "iPhone")
- Agrupe por tipo ou localização
- Use a descrição para notas importantes

### Compartilhar Acesso

Se precisar que outro usuário acesse o painel:
1. Vá para **Configurações**
2. Clique em **Compartilhamento**
3. Adicione o e-mail do usuário
4. Selecione as permissões
5. Clique em **Convidar**

## Suporte

Precisa de ajuda?

- 📚 **Documentação**: https://docs.remotemonitor.com
- 💬 **Chat**: Clique em "Ajuda" no painel
- 📧 **Email**: support@remotemonitor.com
- 🐛 **Reportar Bug**: Clique em "Reportar Problema"

## Próximos Passos

Agora que você conhece o painel:

1. ✅ Instale o agente em seus dispositivos
2. ✅ Configure os alertas desejados
3. ✅ Explore o mapa em tempo real
4. ✅ Verifique o histórico de eventos
5. ✅ Customize as notificações

Aproveite o monitoramento remoto! 🚀
